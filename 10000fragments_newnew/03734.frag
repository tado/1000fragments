uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.36 + sin(p.y * 2.83 + t * 6.00) * 4.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.21;
	{ float fr = length(p); p *= 1.0 + 0.73 * fr * fr; }
	p.y += sin(p.x * 6.93 + time * 3.44) * 0.21;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.87; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.18, vec3(0.58, 0.45, 0.42), vec3(0.33, 0.35, 0.40), vec3(0.75, 1.35, 0.96), vec3(0.45, 0.46, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
