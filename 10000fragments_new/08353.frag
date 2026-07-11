uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 18.33 - t * 2.53 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 28.47 - t * 6.17 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.39;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.63 / 3.1415927, 0.68 / r - time * 1.51);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.48 + time * 0.76);
	col *= clamp(r * 1.80, 0.0, 1.0);
	col = mod(col * 2.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
