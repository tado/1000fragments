uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.96 - t * 6.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	{ p = vec2(atan(p.y, p.x) * 2.57, length(p) * 4.08 - time * 0.25); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.23, vec3(0.44, 0.47, 0.53), vec3(0.50, 0.31, 0.40), vec3(1.05, 1.13, 1.12), vec3(0.72, 0.02, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
