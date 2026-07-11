uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.67);
    float gsh = hash21(vec2(grow, floor(t * 6.88))) - 0.5;
    float gx = p.x + gsh * 0.40;
    v = sin(gx * 14.05 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.33));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	{ float fr = length(p); p *= 1.0 + 0.71 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.54));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
