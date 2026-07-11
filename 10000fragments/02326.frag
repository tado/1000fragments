uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.28 * cos(sa * 6 + t * 0.82 + ph);
    v = sin((sr - petal) * 7.38);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.20, 1.37, 0.71) + vec3(0.20, 0.16, 0.02);
	col = fract(col * 1.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
