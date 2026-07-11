uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.78 + jf * 4.0), cos(t * 0.54 * jf)) * 0.51;
        xs += sin(length(p - im) * 158.44 - t * 13.74 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.05, vec3(0.58, 0.52, 0.43), vec3(0.38, 0.32, 0.42), vec3(1.21, 1.30, 1.35), vec3(0.61, 0.18, 0.41));
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
