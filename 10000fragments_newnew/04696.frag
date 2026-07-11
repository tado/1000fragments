uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.88 + ga * 5.0 - t * 0.61 + ph);
    v = arm * exp(-gr * 0.66);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	p *= 1.0 + 0.19 * sin(time * 3.88);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.20 + time * 0.14);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.60 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
