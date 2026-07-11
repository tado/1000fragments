uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.32, t * 1.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.30), cos(time * 1.23)) * 0.14;
	float an = atan(p.y, p.x) + time * 0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.00 / 3.1415927, 0.95 / r + time * 1.94);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.55 + time * 0.02);
	col *= clamp(r * 1.51, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
