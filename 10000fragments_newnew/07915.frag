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
    float grow = floor(p.y * 15.42);
    float gsh = hash21(vec2(grow, floor(t * 7.12))) - 0.5;
    float gx = p.x + gsh * 1.19;
    v = sin(gx * 8.47 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.28));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.25) * p * 13.33;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 0.65 + time * 0.19, vec3(0.55, 0.50, 0.53), vec3(0.41, 0.40, 0.40), vec3(0.88, 0.93, 0.80), vec3(0.52, 0.68, 0.94)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
