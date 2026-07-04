uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.21 - t * 1.48;
    v = sin(floor(lv * 4.9) / 4.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.17;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.77; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.91;
	p.y += sin(p.x * 7.15 + time * 1.16) * 0.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.74));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
