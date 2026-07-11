uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.53 + sr * 8.38 - t * 1.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	p = fract(p * 2.92) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.08, 1.23, 1.05) + vec3(0.06, 0.04, 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
