uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 21.58 - t * 1.42 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 21.17 - t * 1.42 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	p = fract(p * 2.75) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.26; p = rot2(2.33) * p; }
	p = rot2(0.67) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.08, vec3(0.41, 0.54, 0.49), vec3(0.38, 0.35, 0.45), vec3(1.28, 0.88, 1.04), vec3(0.47, 0.34, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
