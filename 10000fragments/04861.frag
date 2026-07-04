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
    float grow = floor(p.y * 20.67);
    float gsh = hash21(vec2(grow, floor(t * 4.27))) - 0.5;
    float gx = p.x + gsh * 1.02;
    v = sin(gx * 11.06 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.36));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.15) * p * 12.26;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 0.82 + time * 0.28, vec3(0.54, 0.49, 0.43), vec3(0.34, 0.31, 0.41), vec3(0.86, 0.96, 1.20), vec3(0.24, 0.44, 0.66)) * v;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
