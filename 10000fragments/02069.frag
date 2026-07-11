uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.41 + sr * 4.18 - t * 0.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.73 + time * 0.17, vec3(0.58, 0.40, 0.47), vec3(0.41, 0.41, 0.41), vec3(0.97, 1.35, 1.21), vec3(0.85, 0.22, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
