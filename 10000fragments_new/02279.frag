uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.54 + 0.27 * pow(abs(cos(ra * 3.0 + t * 1.21)), 1.94);
    v = sin((rr - pet) * 13.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.52 + time * 0.16);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.07 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
