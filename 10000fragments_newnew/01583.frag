uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.46);
    float gsh = hash21(vec2(grow, floor(t * 3.54))) - 0.5;
    float gx = p.x + gsh * 0.86;
    v = sin(gx * 16.94 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.55));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 1.20 + time * 0.92) * p;
	p *= 2.53;
	p = rot2(p.y * 2.18 + time * 0.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.68 + time * 0.05);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.44 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
