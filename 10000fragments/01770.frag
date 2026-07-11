uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.40 - t * 4.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.09, 0.31) * sin(length(p) * 2.71 - time * 1.72) * 0.37;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.09, vec3(0.45, 0.50, 0.55), vec3(0.42, 0.44, 0.46), vec3(1.30, 1.07, 1.23), vec3(0.66, 0.60, 0.61));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
