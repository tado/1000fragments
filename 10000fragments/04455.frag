uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.60 + sr * 20.35 - t * 0.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.21, vec3(0.47, 0.44, 0.59), vec3(0.40, 0.43, 0.31), vec3(1.40, 1.39, 1.39), vec3(0.57, 0.91, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
