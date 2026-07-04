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
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.63 + ga * 2.0 - t * 1.09 + ph);
    v = arm * exp(-gr * 0.70);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.81;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.73) * p * 16.57;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.00 + time * 0.16, vec3(0.50, 0.44, 0.41), vec3(0.45, 0.31, 0.37), vec3(1.08, 0.85, 1.14), vec3(0.72, 0.11, 0.12)) * v;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
