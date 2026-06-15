uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.52 + sr * 18.55 - t * 1.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.04, vec3(0.56, 0.59, 0.59), vec3(0.42, 0.39, 0.46), vec3(1.22, 1.18, 1.14), vec3(0.26, 0.10, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
