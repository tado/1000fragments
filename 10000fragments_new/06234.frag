uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.31);
    float gsh = hash21(vec2(grow, floor(t * 6.11))) - 0.5;
    float gx = p.x + gsh * 0.64;
    v = sin(gx * 8.68 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.32));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	p *= 1.70;
	p = rot2(p.y * 3.20 + time * 0.35) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.37, lr * 1.16 + time * -0.79); }
	p = fract(p * 2.32) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.44));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
