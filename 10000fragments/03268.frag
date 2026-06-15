uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 36.05 - t * 4.36 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 25.01 - t * 4.36 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	p = rot2(1.97) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.26; p = rot2(0.72) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.07, vec3(0.41, 0.52, 0.53), vec3(0.39, 0.40, 0.49), vec3(0.90, 0.84, 0.97), vec3(0.46, 0.92, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
