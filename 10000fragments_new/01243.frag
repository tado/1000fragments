uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 7.56 * sin(t * 1.03) + t * 5.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.99 * p.y + time * 1.76); p.y += 0.28 / wf * cos(wf * 2.80 * p.x + time * 1.67); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.29, vec3(0.57, 0.44, 0.46), vec3(0.37, 0.34, 0.46), vec3(1.20, 0.75, 0.91), vec3(0.44, 0.22, 0.17));
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
