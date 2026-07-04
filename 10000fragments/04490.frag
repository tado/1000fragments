uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.30 + t * 0.44) - 0.5) * 2.0;
    v = sin((p.y * 5.13 + zx * 1.41 + t * 2.31) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.89;
	p = (floor(p * 14.1) + 0.5) / 14.1;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.46; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.46, 0.34, 0.32) * (0.19 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
