uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.55 + sr * 22.97 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.96;
	p *= 2.85;
	p = fract(p * 2.33) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
