uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.38 + vec2(t * 1.58, -t * 0.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.91), cos(time * 1.30)) * 0.06;
	float an = atan(p.y, p.x) + time * -0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.79 / 3.1415927, 0.42 / r - time * 1.86);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.12 + time * 0.21);
	col *= clamp(r * 1.54, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
