uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.51 + t * 3.56 + ph) + sin(p.y * 5.89 - t * 5.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.43; }
	{ p = vec2(atan(p.y, p.x) * 2.03, length(p) * 4.83 - time * 0.24); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.78, 0.69, 0.60) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
