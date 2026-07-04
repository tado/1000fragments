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
    float grow = floor(p.y * 10.53);
    float gsh = hash21(vec2(grow, floor(t * 8.60))) - 0.5;
    float gx = p.x + gsh * 0.46;
    v = sin(gx * 13.01 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.43));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	p *= 1.0 + 0.18 * sin(time * 4.40);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.06;
	p = rot2(p.y * -3.05 + time * 0.41) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.89 + time * 0.03);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.68 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
