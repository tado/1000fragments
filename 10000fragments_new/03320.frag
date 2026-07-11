uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.70 + sin(p.y * 4.88 + t * 1.93) * 3.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.24;
	p *= 1.68;
	p = fract(p * 1.67) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.99, 0.41, 0.40) * (0.22 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
