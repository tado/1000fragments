uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.19 * cos(sa * 4 + t * 1.58 + ph);
    v = sin((sr - petal) * 16.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.68;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.88 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
