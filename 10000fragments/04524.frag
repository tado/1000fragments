uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 10.05 - t * 4.76 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 16.59 - t * 4.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	p = abs(p) - 0.36;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.70 + time * 0.15);
	col = mod(col * 2.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
