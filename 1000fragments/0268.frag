uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.58;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 22.88 - t * 4.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.26, vec3(0.50, 0.48, 0.46), vec3(0.42, 0.36, 0.50), vec3(0.90, 1.08, 0.95), vec3(0.57, 0.64, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
