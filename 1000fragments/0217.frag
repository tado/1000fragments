uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.92 - t * 1.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.19, vec3(0.57, 0.51, 0.45), vec3(0.45, 0.41, 0.49), vec3(0.73, 1.31, 1.39), vec3(0.61, 0.94, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
