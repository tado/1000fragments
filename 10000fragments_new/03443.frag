uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.09);
    float gsh = hash21(vec2(grow, floor(t * 9.52))) - 0.5;
    float gx = p.x + gsh * 1.09;
    v = sin(gx * 11.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.61));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	{ p = vec2(atan(p.y, p.x) * 2.09, length(p) * 2.86 - time * 0.59); }
	p = fract(p * 2.80) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.24), field(p, time, 2.48));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
