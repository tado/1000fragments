uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 35.43 - t * 1.40 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 33.08 - t * 1.40 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.94 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
