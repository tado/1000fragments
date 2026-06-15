uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.88 - t * 7.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p += vec2(-0.90, -0.49) * sin(length(p) * 4.40 - time * 0.54) * 0.20;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.05, vec3(0.45, 0.59, 0.58), vec3(0.41, 0.37, 0.32), vec3(1.40, 0.76, 1.14), vec3(0.24, 0.09, 0.68));
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
