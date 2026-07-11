uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.52 + sr * 11.52 - t * 3.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	p *= 3.30;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.26, vec3(0.44, 0.46, 0.46), vec3(0.48, 0.41, 0.42), vec3(1.08, 0.86, 1.04), vec3(0.05, 0.44, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
