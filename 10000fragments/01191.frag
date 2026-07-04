uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.11 + vec2(t * 2.19, -t * 0.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.79 / 3.1415927, 1.23 / r + time * 2.28);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.50 + time * 0.35);
	col *= clamp(r * 1.10, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
