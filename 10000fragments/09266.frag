uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.41 * jf)) * 0.37;
        xs += sin(length(p - im) * 104.01 - t * 8.51 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.13;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.14, vec3(0.54, 0.55, 0.42), vec3(0.46, 0.39, 0.48), vec3(1.18, 1.27, 0.93), vec3(0.08, 0.08, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
