uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 16.49 - t * 4.37 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 12.72 - t * 6.56 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.12), cos(time * 1.13)) * 0.28;
	float an = atan(p.y, p.x) + time * 0.34;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 0.56 / r + time * 2.32);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.11 + time * 0.06);
	col *= clamp(r * 1.45, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.42 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
