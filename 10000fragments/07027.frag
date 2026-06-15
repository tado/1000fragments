uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.18 * cos(sa * 4 + t * 2.07 + ph);
    v = sin((sr - petal) * 7.10);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.10, 0.48), vec3(0.95, 0.81, 0.85), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
