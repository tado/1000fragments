uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.25 * pow(abs(cos(ra * 5.0 + t * 0.78)), 2.52);
    v = sin((rr - pet) * 23.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.74 / 3.1415927, 0.80 / r + time * 2.77);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.73, 0.17, 0.59) * (0.09 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 2.67, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
