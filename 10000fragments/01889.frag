uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.94 + sr * 16.79 - t * 2.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.98;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.03, vec3(0.41, 0.60, 0.55), vec3(0.39, 0.31, 0.47), vec3(1.00, 1.10, 1.05), vec3(0.90, 0.64, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
