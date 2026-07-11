uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.35) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 1.43 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 1.91 * p.y + time * 1.39); p.y += 0.40 / wf * cos(wf * 2.39 * p.x + time * 1.71); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.86 + time * 0.28);
	col = fract(col * 1.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
