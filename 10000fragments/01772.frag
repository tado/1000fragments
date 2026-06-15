uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.25 + sin(p.y * 5.25 + t * 3.95) * 2.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.30, -0.26) * sin(length(p) * 4.69 - time * 1.00) * 0.32;
	p = fract(p * 2.92) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.57 + time * 0.20);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
