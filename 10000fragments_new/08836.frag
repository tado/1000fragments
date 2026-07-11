uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.25);
    float gsh = hash21(vec2(grow, floor(t * 9.52))) - 0.5;
    float gx = p.x + gsh * 1.15;
    v = sin(gx * 11.77 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.38));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.68, lr * 1.40 + time * 0.54); }
	p = abs(p) - 0.38;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.70));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
