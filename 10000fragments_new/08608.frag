uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.69;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.41; kp = rot2(2.75) * kp; kp *= 1.29; }
    v = sin(kp.x * 1.39 - t * 4.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.06, vec3(0.55, 0.47, 0.53), vec3(0.41, 0.45, 0.34), vec3(0.94, 1.34, 0.90), vec3(0.53, 0.38, 0.70));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
