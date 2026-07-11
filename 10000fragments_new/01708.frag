uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.12);
    float gsh = hash21(vec2(grow, floor(t * 9.33))) - 0.5;
    float gx = p.x + gsh * 0.51;
    v = sin(gx * 19.92 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.31));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	{ p = vec2(atan(p.y, p.x) * 2.56, length(p) * 3.71 - time * 0.78); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.32, 0.27, 0.60) * (0.15 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
