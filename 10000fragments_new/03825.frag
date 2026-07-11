uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.09 + t * 2.48 + ph) * 0.7;
    float wb = sin(p.y * 5.50 - t * 2.73 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.33;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.46;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.15 / 3.1415927, 0.87 / r + time * 2.45);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.81 + time * 0.96);
	col *= clamp(r * 2.99, 0.0, 1.0);
	col = mod(col * 1.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
