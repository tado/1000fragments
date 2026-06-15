uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.03 + sin(p.y * 2.16 + t * 0.69) * 4.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	p = fract(p * 1.33) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.13, vec3(0.52, 0.56, 0.56), vec3(0.35, 0.44, 0.33), vec3(0.98, 0.92, 0.81), vec3(0.11, 0.38, 0.67));
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
