uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.22 * cos(sa * 3 + t * 0.60 + ph);
    v = sin((sr - petal) * 17.43);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.67;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.49 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
