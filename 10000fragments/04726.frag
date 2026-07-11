uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 36.33 - t * 4.40 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 16.10 - t * 4.40 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.17; p = rot2(1.92) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.40 + time * 0.09);
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
