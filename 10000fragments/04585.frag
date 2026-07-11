uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 33.71 - t * 6.98 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 33.61 - t * 6.98 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.54; p = rot2(0.96) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.11, vec3(0.59, 0.54, 0.55), vec3(0.37, 0.35, 0.46), vec3(1.03, 1.14, 0.94), vec3(0.07, 0.12, 0.64));
	col = mod(col * 2.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
