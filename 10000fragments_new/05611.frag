uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.40 + t * 1.43 + ph) + sin(p.y * 2.36 - t * 4.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.27;
	p *= 1.82;
	p.y += sin(p.x * 5.60 + time * 3.35) * 0.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.25, vec3(0.43, 0.55, 0.56), vec3(0.36, 0.40, 0.38), vec3(0.70, 1.37, 0.72), vec3(0.79, 0.36, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
