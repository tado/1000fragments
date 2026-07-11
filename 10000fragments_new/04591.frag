uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.31);
    float gsh = hash21(vec2(grow, floor(t * 5.53))) - 0.5;
    float gx = p.x + gsh * 1.06;
    v = sin(gx * 13.11 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.32));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.26;
	p = abs(p) - 0.42;
	p = fract(p * 1.07) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.65));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
